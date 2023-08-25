'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  router.push('/landing')
  return (
    <h1>Home Page</h1>
  );
}
