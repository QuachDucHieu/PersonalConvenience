import Cookies from 'js-cookie';

export async function httpClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = Cookies.get('accessToken');
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Secret-Key': secret,
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Có lỗi xảy ra');
  }

  return data;
} 