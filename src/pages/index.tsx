// src/pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

type ApiData = {
  fact: string;
};

export default function Home({ initialData }: { initialData: ApiData }) {
  const [apiData, setApiData] = useState<ApiData>(initialData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/catFact');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>APP ABOUT CAT FACTS :D</h1>
      <p>&#128176;</p>
      <p>I will display &#128176;</p>
      <p>I will display &#x1F4B0;</p>
      <p>🐱</p>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Display the fetched data */}
        <div>
          <h2>Fetched Data:</h2>
          <ul>
            <li>{apiData.fact}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiData = await response.json();
    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: { fact: 'Failed to fetch data' },
      },
    };
  }
}
