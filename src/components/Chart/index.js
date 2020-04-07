import React, { useLayoutEffect, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './chart.css';
import btc from 'src/data/btc.json';
import eth from 'src/data/eth.json';
import ltc from 'src/data/ltc.json';
import xrp from 'src/data/xrp.json';


const Chart = () => {
  const [currencyTag, setCurrencyTag] = useState(eth);
  const [currencyName, setCurrencyName] = useState('Ethereum');
  const [averageScore, setAverageScore] = useState(0);
  const [size, setSize] = useState(window.innerWidth);

  const calculScore = (datas) => {
    let score = 0;
    datas.map((data) => {
      score += data.score;
    });
    return (score / datas.length);
  };

  const btcAverageScore = calculScore(btc);

  const selectedCurrency = (e) => {
    const currency = e.target.value.split('-');
    const [tag, name] = currency;
    setCurrencyName(name);
    switch (tag) {
      case 'eth':
        setCurrencyTag(eth);
        setAverageScore(calculScore(eth));
        break;
      case 'ltc':
        setCurrencyTag(ltc);
        setAverageScore(calculScore(ltc));

        break;
      case 'xrp':
        setCurrencyTag(xrp);
        setAverageScore(calculScore(xrp));

        break;
      default:
        setCurrencyTag(eth);
        setAverageScore(calculScore(eth));
    }
  };

  useEffect(
    () => { },
    [currencyTag],
  );
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div>
      <ScatterChart
        width={(size - 50)}
        height={(size / 2)}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis type="number" dataKey="score" name="Google trend score" unit="" />
        <CartesianGrid />
        <ZAxis type="number" dataKey="ratio" name="Low/Hight Ratio" range={[size / 200, size / 8]} unit="" />
        <YAxis yAxisId="left" type="number" dataKey="price" name="Price" unit="USD" stroke="#8884d8" />
        <YAxis yAxisId="right" type="number" dataKey="price" name="Price" unit="USD" orientation="right" stroke="#82ca9d" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter yAxisId="left" name="Bitcoin" data={btc} fill="#8884d8" />
        <Scatter yAxisId="right" name={currencyName} data={currencyTag} fill="#82ca9d" />
        <Legend />
      </ScatterChart>
      <select className="customSelect" onChange={selectedCurrency} label="currency">
        <option value="eth-Ethereum">Ethereum</option>
        <option value="ltc-Litecoin">Litecoin</option>
        <option value="xrp-Ripple">Ripple</option>
      </select>
    </div>
  );
};

Chart.propTypes = {

};

export default Chart;
