'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Activity, Users, Eye, TrendingUp, Globe, Monitor,
  Smartphone, Tablet, RefreshCw, Clock, ArrowUpRight,
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function pct(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="dash-stat-card">
      <div className="dash-stat-icon" style={{ background: color + '18', color }}>
        <Icon size={20} />
      </div>
      <div className="dash-stat-info">
        <p className="dash-stat-label">{label}</p>
        <h3 className="dash-stat-value">{value ?? '—'}</h3>
        {sub && <p className="dash-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

function HourlyChart({ data }) {
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="dash-card">
      <h3 className="dash-card-title">Page Views — Last 24 Hours</h3>
      <div className="dash-hourly">
        {data.map((d, i) => (
          <div key={i} className="dash-hourly-col" title={`${d.hour}:00 — ${d.views} views`}>
            <div
              className="dash-hourly-bar"
              style={{ height: `${Math.max(pct(d.views, maxViews), d.views ? 4 : 2)}%` }}
            />
            {i % 4 === 0 && (
              <span className="dash-hourly-label">{String(d.hour).padStart(2, '0')}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopPages({ pages }) {
  const max = pages[0]?.views || 1;
  return (
    <div className="dash-card">
      <h3 className="dash-card-title">Top Pages</h3>
      <div className="dash-top-pages">
        {pages.length === 0 && <p className="dash-empty">No data yet</p>}
        {pages.map((p, i) => (
          <div key={i} className="dash-page-row">
            <div className="dash-page-meta">
              <span className="dash-page-rank">#{i + 1}</span>
              <span className="dash-page-path">{p.path}</span>
            </div>
            <div className="dash-page-bar-wrap">
              <div className="dash-page-bar" style={{ width: `${pct(p.views, max)}%` }} />
            </div>
            <span className="dash-page-views">{p.views}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeviceChart({ devices }) {
  const total = Object.values(devices).reduce((a, b) => a + b, 0);
  const icons = { Desktop: Monitor, Mobile: Smartphone, Tablet };
  const colors = { Desktop: '#6366f1', Mobile: '#22d3ee', Tablet: '#f59e0b' };

  return (
    <div className="dash-card">
      <h3 className="dash-card-title">Devices</h3>
      <div className="dash-devices">
        {Object.entries(devices).length === 0 && <p className="dash-empty">No data yet</p>}
        {Object.entries(devices).map(([device, count]) => {
          const Icon = icons[device] || Monitor;
          return (
            <div key={device} className="dash-device-row">
              <div className="dash-device-label">
                <Icon size={16} color={colors[device]} />
                <span>{device}</span>
              </div>
              <div className="dash-device-bar-wrap">
                <div
                  className="dash-device-bar"
                  style={{ width: `${pct(count, total)}%`, background: colors[device] }}
                />
              </div>
              <span className="dash-device-pct">{pct(count, total)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CountryList({ countries }) {
  return (
    <div className="dash-card">
      <h3 className="dash-card-title">Top Countries</h3>
      <div className="dash-countries">
        {countries.length === 0 && <p className="dash-empty">No data yet</p>}
        {countries.map((c, i) => (
          <div key={i} className="dash-country-row">
            <Globe size={14} className="dash-country-icon" />
            <span className="dash-country-name">{c.country}</span>
            <span className="dash-country-views">{c.views} views</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentVisits({ visits }) {
  return (
    <div className="dash-card dash-card--full">
      <h3 className="dash-card-title">Recent Visits</h3>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Device</th>
              <th>Country</th>
              <th>City</th>
              <th>Referrer</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {visits.length === 0 && (
              <tr><td colSpan={6} className="dash-empty">No visits recorded yet — browse the site to see data appear here.</td></tr>
            )}
            {visits.map((v, i) => (
              <tr key={i}>
                <td className="dash-td-path">{v.path}</td>
                <td>{v.device}</td>
                <td>{v.country}</td>
                <td>{v.city}</td>
                <td className="dash-td-ref">
                  {v.ref ? (
                    <a href={v.ref} target="_blank" rel="noreferrer" className="dash-ref-link">
                      {new URL(v.ref).hostname} <ArrowUpRight size={11} />
                    </a>
                  ) : <span className="dash-direct">Direct</span>}
                </td>
                <td className="dash-td-time"><Clock size={12} />{timeAgo(v.ts)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed');
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (e) {
      console.error('Analytics fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="dash-root">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div>
            <h1 className="dash-title">
              <Activity size={22} className="dash-title-icon" />
              Analytics Dashboard
            </h1>
            <p className="dash-subtitle">jaqyi.com — Website traffic & user activity</p>
          </div>
          <div className="dash-header-right">
            {lastRefresh && (
              <span className="dash-refresh-time">
                Updated {timeAgo(lastRefresh.getTime())}
              </span>
            )}
            <button className="dash-refresh-btn" onClick={fetchData} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'dash-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        {loading && !data ? (
          <div className="dash-loading">
            <RefreshCw size={32} className="dash-spin" />
            <p>Loading analytics…</p>
          </div>
        ) : data ? (
          <>
            {/* Stat Cards */}
            <div className="dash-stats-row">
              <StatCard
                icon={Eye}
                label="Total Page Views"
                value={data.totals.allTime.toLocaleString()}
                sub="All time"
                color="#6366f1"
              />
              <StatCard
                icon={TrendingUp}
                label="Today"
                value={data.totals.today.toLocaleString()}
                sub="Last 24 hours"
                color="#22d3ee"
              />
              <StatCard
                icon={Activity}
                label="This Week"
                value={data.totals.week.toLocaleString()}
                sub="Last 7 days"
                color="#f59e0b"
              />
              <StatCard
                icon={Users}
                label="Unique Visitors"
                value={data.totals.uniqueVisitors.toLocaleString()}
                sub="By IP, last 7 days"
                color="#10b981"
              />
            </div>

            {/* Charts row */}
            <div className="dash-grid-2">
              <HourlyChart data={data.hourly} />
              <TopPages pages={data.topPages} />
            </div>

            {/* Bottom row */}
            <div className="dash-grid-2">
              <DeviceChart devices={data.devices} />
              <CountryList countries={data.topCountries} />
            </div>

            {/* Recent visits */}
            <RecentVisits visits={data.recent} />
          </>
        ) : (
          <div className="dash-loading"><p>No data available.</p></div>
        )}
      </main>
    </div>
  );
}
