"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [apiData, setApiData] = useState<any>({
    fact: 'Loading...',
  
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Your existing JSX code */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Display the fetched data */}
        <div>
          <h2>Fetched Data:</h2>
          <ul>
            
              <li > {apiData.fact}</li>
           
          </ul>
        </div>
      </div>
    </main>
  );
}
