import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';

const App = () => {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataRes, analysisRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/data'),
          axios.get('http://127.0.0.1:5000/api/analysis')
        ]);
        setPrices(dataRes.data.prices);
        setEvents(dataRes.data.events);
        setAnalysis(analysisRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const price = payload[0].value.toFixed(2);
      const matched = events.filter(event => event.date === label);
      return (
        <div className="custom-tooltip">
          <p><strong>Date:</strong> {label}</p>
          <p><strong>Price:</strong> ${price}</p>
          {matched.length > 0 && (
            <div>
              <p className="tooltip-events-title">Events on this day:</p>
              {matched.map((event, i) => (
                <p key={i} className="tooltip-event">- {event.description}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Brent Oil Price Dashboard</h1>
        <p>Analysis of market trends and key events</p>
      </header>

      {analysis && (
        <section className="change-point-section">
          <h2>Change Point Analysis</h2>
          <div className="change-grid">
            <div className="card">
              <p className="label">Most Probable Change Point</p>
              <p className="value red">{analysis.change_point_date}</p>
            </div>
            <div className="card">
              <p className="label">Avg. Price (Before)</p>
              <p className="value green">${analysis.before.mean_price.toFixed(2)}</p>
            </div>
            <div className="card">
              <p className="label">Avg. Price (After)</p>
              <p className="value blue">${analysis.after.mean_price.toFixed(2)}</p>
            </div>
            <div className="card">
              <p className="label">Volatility Change</p>
              <p className="value yellow">
                {(analysis.after.volatility - analysis.before.volatility).toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="chart-section">
        <h2>Historical Brent Oil Prices</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={prices} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#007bff" strokeWidth={2} dot={false} />
            {analysis && (
              <ReferenceLine
                x={analysis.change_point_date}
                stroke="red"
                strokeDasharray="5 5"
                label={{ value: 'Change Point', position: 'insideTopRight', fill: 'red' }}
              />
            )}
            {events.map((event, index) => (
              <ReferenceDot
                key={index}
                x={event.date}
                y={prices.find(p => p.Date === event.date)?.Price || 0}
                r={6}
                fill="#facc15"
                stroke="#b45309"
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="events-section">
        <h2>Key Market Events</h2>
        <div className="event-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <p className="event-title">{event.date} – {event.type}</p>
              <p className="event-desc">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
