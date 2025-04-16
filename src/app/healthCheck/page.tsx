"use client";

import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function HealthCheck() {
  const [analyticsData, setAnalyticsData] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics?analyticsId=${process.env.NEXT_PUBLIC_ANALYTICS_KEY}`,
        HEADER_CONFIG,
      );
      if (response.data) {
        const data = response.data.data;

        const { _id, __v, ...rest } = data;

        setAnalyticsData({ ...rest });
      }
    } catch (error) {
      setError(error);
    }
  };

  const createAnalytics = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/analytics`,
        {
          analyticsId: v4(),
          timestamps: [new Date().toLocaleString()],
        },
        HEADER_CONFIG,
      );
      if (response.data) {
        setAnalyticsData(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <h1 className="flex gap-6">
        HEALTH STATUS :
        {analyticsData ? (
          <span className="bg-green-500/30 px-4 font-bold text-green-800">
            OK
          </span>
        ) : (
          <span className="bg-red-500/30 px-4 font-bold text-red-500">
            NOT OK
          </span>
        )}
      </h1>
      {<pre>{JSON.stringify(analyticsData, null, 2)}</pre>}
      {error && (
        <>
          <h1>ERROR</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
      {/* <button onClick={createAnalytics}>Create</button> */}
    </div>
  );
}
