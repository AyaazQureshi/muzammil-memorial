import { useEffect, useState } from 'react';
import { fetchCampaign } from '../utils/api.js';

export default function useCampaign() {
  const [state, setState] = useState({ loading: true, data: null });
  useEffect(() => {
    const controller = new AbortController();
    fetchCampaign(controller.signal)
      .then((data) => setState({ loading: false, data }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ loading: false, data: null });
      });
    return () => controller.abort();
  }, []);
  return state;
}
