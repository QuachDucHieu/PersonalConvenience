'use client';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Spin, message } from 'antd';
import { CloudOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Thay YOUR_API_KEY bằng API key của bạn từ OpenWeatherMap
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log('data', data);
        setWeather(data);
      } catch (err) {
        message.error(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        setError('Không thể tải dữ liệu thời tiết');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <Text type="danger">{error}</Text>
      </Card>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <CloudOutlined /> Thời tiết hôm nay
      </Title>
      
      {weather && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Nhiệt độ" variant='outlined'>
              <div style={{ textAlign: 'center' }}>
                <Title level={2}>{Math.round(weather.main.temp)}°C</Title>
                <Text type="secondary">Cảm giác như: {Math.round(weather.main.feels_like)}°C</Text>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card title="Độ ẩm" variant='outlined'>
              <div style={{ textAlign: 'center' }}>
                <Title level={2}>{weather.main.humidity}%</Title>
                <Text type="secondary">Độ ẩm không khí</Text>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card title="Thông tin chung" variant='borderless'>
              <div style={{ textAlign: 'center' }}>
                <Title level={4}>
                  <EnvironmentOutlined /> {weather.name}
                </Title>
                <Text>{weather.weather[0].description}</Text>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;