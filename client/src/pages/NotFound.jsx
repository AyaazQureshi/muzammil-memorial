import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-start justify-center gap-4">
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-muted">This page does not exist.</p>
      <Link to="/" className="btn-primary">Back to Remembering Muzammil</Link>
    </main>
  );
}
