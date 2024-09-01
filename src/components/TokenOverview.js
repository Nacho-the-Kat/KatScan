import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, ProgressBar, Badge, Form, InputGroup } from 'react-bootstrap';
import { getKRC20TokenList } from '../services/dataService';
import '../styles/TokenOverview.css';

const ITEMS_PER_PAGE = 50;

const TokenOverview = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllTokens = useCallback(async (offset = 0, accumulatedTokens = []) => {
    try {
      const data = await getKRC20TokenList(ITEMS_PER_PAGE, sortField, sortDirection, offset);
      
      if (data.result && data.result.length > 0) {
        const newTokens = [...accumulatedTokens, ...data.result];
        
        if (data.result.length === ITEMS_PER_PAGE) {
          // If we received a full page, continue fetching
          return fetchAllTokens(offset + ITEMS_PER_PAGE, newTokens);
        } else {
          // If we received less than a full page, we're done
          setTokens(newTokens);
          setLoading(false);
        }
      } else {
        // If we received no results, we're done
        setTokens(accumulatedTokens);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error in TokenOverview:', err);
      setError(`Failed to fetch tokens: ${err.message}`);
      setLoading(false);
    }
  }, [sortField, sortDirection]);

  useEffect(() => {
    setLoading(true);
    fetchAllTokens();
  }, [fetchAllTokens]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTokens = useMemo(() => {
    let result = tokens;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(token => 
        token.tick.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tokens, searchTerm, sortField, sortDirection]);

  const formatNumber = (value, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const calculateValue = (value, decimals) => {
    return parseFloat(value) / Math.pow(10, parseInt(decimals));
  };

  const calculatePercentage = (part, whole) => {
    return (part / whole) * 100;
  };

  const formatState = (state) => {
    return state === 'finished' ? 'Fully Minted' : 'Minting';
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPercentage = (value, max) => {
    const percentage = (value / max) * 100;
    const formattedPercentage = percentage < 1 && percentage > 0 ? '<1' : Math.round(percentage);
    return `(${formattedPercentage}%)`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="token-overview">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All KRC-20 Tokens</h2>
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </div>
      <div className="table-wrapper">
        <div className="table-scroll">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('tick')}>Ticker {sortField === 'tick' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th>Launch Type</th>
                <th onClick={() => handleSort('max')}>Max Supply {sortField === 'max' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('pre')}>Pre-Minted {sortField === 'pre' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('minted')}>Total Minted {sortField === 'minted' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th>Minting Progress</th>
                <th onClick={() => handleSort('mtsAdd')}>Deployed Date {sortField === 'mtsAdd' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTokens.length > 0 ? (
                filteredAndSortedTokens.map((token) => (
                  <tr key={token.tick}>
                    <td><Link to={`/tokens/${token.tick}`}>{token.tick}</Link></td>
                    <td>
                      <Badge bg={token.pre === '0' ? 'success' : 'warning'}>
                        {token.pre === '0' ? 'Fair Mint' : 'Pre-Mint'}
                      </Badge>
                    </td>
                    <td>{formatNumber(calculateValue(token.max, token.dec))}</td>
                    <td>
                      {formatNumber(calculateValue(token.pre, token.dec))}
                      {' '}
                      <small className="text-muted">{formatPercentage(calculateValue(token.pre, token.dec), calculateValue(token.max, token.dec))}</small>
                    </td>
                    <td>
                      {formatNumber(calculateValue(token.minted, token.dec))}
                      {' '}
                      <small className="text-muted">{formatPercentage(calculateValue(token.minted, token.dec), calculateValue(token.max, token.dec))}</small>
                    </td>
                    <td>
                      <ProgressBar 
                        now={calculatePercentage(calculateValue(token.minted, token.dec), calculateValue(token.max, token.dec))} 
                      />
                    </td>
                    <td>{formatDate(token.mtsAdd)}</td>
                    <td>{formatState(token.state)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {loading ? 'Loading...' : 'No tokens to display'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TokenOverview;
