import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Col, Container, Form, InputGroup, Row} from 'react-bootstrap';
import {FaArrowRight, FaExternalLinkAlt, FaSearch} from 'react-icons/fa';
import '../styles/TransactionLookup.css';
import {Page, simpleRequest} from "nacho-component-library";
import {OpTransactionData} from "../interfaces/OpTransactionData";
import {Transaction} from "../interfaces/Transaction";
import {ResultResponse} from "../interfaces/ApiResponseTypes";
import {SEO, JsonLd, LoadingSpinner, NormalCard} from "nacho-component-library";
import {TransactionDetails} from "../components/transactionLookup/TransactionDetails";
import {formatKaspa, formatKRC20Amount} from "../services/Helper";

export type TransactionData = {
    krc20Data: OpTransactionData
    revealData: Transaction
    commitData: {
        outputs: { script_public_key_address: string }[]
        transaction_id: string
        accepting_block_blue_score: string
        is_accepted: boolean
        inputs: Record<string, string>[]
        block_time: string
    }
}

const jsonData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KatScan Transaction Lookup",
    "description": "Explore detailed information about KRC-20 token transactions on the Kaspa blockchain.",
    "url": "https://katscan.xyz/transaction-lookup"
}

const TransactionLookup: FC = () => {

    const [transactionHash, setTransactionHash] = useState('');
    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {hashRev} = useParams();
    const navigate = useNavigate();

    const fetchTransactionData = async (hash: string): Promise<void> => {
        if (!hash) return;
        setLoading(true);
        setError(null);
        try {
            const [krc20Response, revealData] = await Promise.all([
                simpleRequest<ResultResponse<OpTransactionData[]>>(`https://api.kasplex.org/v1/krc20/op/${hash}`),
                simpleRequest<Transaction>(`https://api.kaspa.org/transactions/${hash}`)
            ]);

            const krc20Data = krc20Response.result[0];

            const commitHash = revealData.inputs?.[0].previous_outpoint_hash;
            const commitData = await simpleRequest<TransactionData['commitData']>(`https://api.kaspa.org/transactions/${commitHash ?? ''}`);

            setTransactionData({krc20Data, revealData, commitData});
        } catch (err) {
            console.error('Failed to fetch transaction data:', err);
            setError('Failed to fetch transaction data. Please check the transaction hash and try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hashRev) {
            setTransactionHash(hashRev);
            void fetchTransactionData(hashRev);
        }
    }, [hashRev]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (transactionHash) {
            navigate(`/transaction-lookup/${transactionHash}`);
        }
    };

    const openExplorerForP2SH = (address: string): void => {
        window.open(`https://explorer.kaspa.org/addresses/${address}`, '_blank', 'noopener,noreferrer');
    };

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <Page header={'Transaction Lookup'}>
            <Container className="transaction-lookup">
                <SEO
                    title="Transaction Lookup"
                    description="Explore detailed information about KRC-20 token transactions on the Kaspa blockchain."
                    keywords="KRC-20, Kaspa, transaction lookup, blockchain explorer, token transfers"
                />
                <JsonLd
                    data={jsonData}
                />

                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter transaction hash"
                            value={transactionHash}
                            onChange={(e) => setTransactionHash(e.target.value)}
                        />
                        <Button variant="primary" type="submit">
                            <FaSearch/> Search
                        </Button>
                    </InputGroup>
                </Form>

                {loading && <LoadingSpinner/>}
                {error && <Alert variant="danger">{error}</Alert>}

                {transactionData && (
                    <div className="transaction-details">
                        <NormalCard title={'KRC-20 Operation Overview'} titleProps={{as: 'h5'}}>
                            <Row className="mb-2">
                                <Col sm={4}><strong>Operation</strong></Col>
                                <Col sm={8}>{capitalizeFirstLetter(transactionData.krc20Data.op)}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4}><strong>Token</strong></Col>
                                <Col sm={8}>{transactionData.krc20Data.tick}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4}><strong>Amount</strong></Col>
                                <Col
                                    sm={8}>{formatKRC20Amount(transactionData.krc20Data.amt, 8, transactionData.krc20Data.tick)}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4}><strong>P2SH Address</strong></Col>
                                <Col sm={8}>
                  <span className="clickable-address"
                        onClick={() => openExplorerForP2SH(transactionData.commitData.outputs[0].script_public_key_address)}>
                    {transactionData.commitData.outputs[0].script_public_key_address}
                      <FaExternalLinkAlt className="ms-2"/>
                  </span>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4}><strong>Wallet Address</strong></Col>
                                <Col sm={8}>
                                    <Link to={`/wallet/${transactionData.krc20Data.to}`}
                                          className={'clickable-address'}>
                                        {transactionData.krc20Data.to}
                                    </Link>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col sm={4}><strong>Transaction Fee</strong></Col>
                                <Col sm={8}>{formatKaspa(transactionData.krc20Data.feeRev)}</Col>
                            </Row>
                            <Row>
                                <Col sm={4}><strong>Operation Score</strong></Col>
                                <Col sm={8}>{transactionData.krc20Data.opScore}</Col>
                            </Row>
                        </NormalCard>

                        <div className="transaction-flow mb-4">
                            <div className="commit-transaction">
                                <h6>Commit Transaction</h6>
                                <p>{transactionData.commitData.transaction_id}</p>
                            </div>
                            <FaArrowRight className="flow-arrow"/>
                            <div className="reveal-transaction">
                                <h6>Reveal Transaction</h6>
                                <p>{transactionData.revealData.transaction_id}</p>
                            </div>
                        </div>
                        <TransactionDetails data={transactionData.commitData}
                                            title={"Commit Transaction Details"}/>
                    </div>
                )}
            </Container>
        </Page>
    );
};

export default TransactionLookup;
