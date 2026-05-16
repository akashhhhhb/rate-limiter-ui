import { useCallback, useEffect, useState } from "react";

import MetricCard from "../components/MetricCard";

import RequestChart from "../components/RequestChart";

import TopApis from "../components/TopApis";

import TopUsers from "../components/TopUsers";

import CacheHitRatio from "../components/CacheHitRatio";

import DashboardNav from "../components/DashboardNav";

import { connectWebSocket } from "../services/websocketService";

import "./Dashboard.css";

const METRICS_STORAGE_KEY = "rateLimiterDashboardMetrics";

const CHART_STORAGE_KEY = "rateLimiterDashboardChartDataPerTick";

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Failed to read dashboard cache", error);

    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save dashboard cache", error);
  }
};

let cachedMetrics = readStorage(METRICS_STORAGE_KEY, null);

let cachedChartData = readStorage(CHART_STORAGE_KEY, []);

function Dashboard() {
  const [metrics, setMetrics] = useState(cachedMetrics);

  const [chartData, setChartData] = useState(cachedChartData);

  const updateMetrics = useCallback((data) => {
    const previousMetrics = cachedMetrics;

    setMetrics(data);

    cachedMetrics = data;

    writeStorage(METRICS_STORAGE_KEY, data);

    setChartData((prev) => {
      const nextChartData = [
        ...prev,

        {
          time: new Date().toLocaleTimeString(),

          total: previousMetrics
            ? Math.max(data.totalRequests - previousMetrics.totalRequests, 0)
            : 0,

          blocked: previousMetrics
            ? Math.max(
                data.blockedRequests - previousMetrics.blockedRequests,
                0,
              )
            : 0,
        },
      ].slice(-10);

      cachedChartData = nextChartData;

      writeStorage(CHART_STORAGE_KEY, nextChartData);

      return nextChartData;
    });
  }, []);

  useEffect(() => {
    const disconnect = connectWebSocket(updateMetrics);

    return disconnect;
  }, [updateMetrics]);

  if (!metrics) {
    return (
      <div className="dashboard-container">
        <DashboardNav />

        <h1>Rate Limiter Dashboard</h1>

        <div className="dashboard-panel dashboard-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardNav />

      <h1>Rate Limiter Dashboard</h1>

      {/* METRIC CARDS */}

      <div className="metrics-grid">
        <MetricCard title="Total Requests" value={metrics.totalRequests} />

        <MetricCard title="Allowed Requests" value={metrics.allowedRequests} />

        <MetricCard title="Blocked Requests" value={metrics.blockedRequests} />

        <MetricCard title="Cache Hits" value={metrics.cacheHits} />

        <MetricCard title="Cache Misses" value={metrics.cacheMisses} />
      </div>

      {/* CHART */}

      <RequestChart data={chartData} />

      {/* TABLES */}

      <div className="dashboard-tables">
        <TopApis apiHits={metrics.apiHits} />

        <TopUsers userHits={metrics.userHits} />

        <CacheHitRatio hits={metrics.cacheHits} misses={metrics.cacheMisses} />
      </div>
    </div>
  );
}

export default Dashboard;
