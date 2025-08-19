import React, { FC, useEffect, useState } from "react";
import logo from '../assets/logo.png';

export const UnderMaintenance: FC = () => {
    const [countdown, setCountdown] = useState(15);
    const [blocks, setBlocks] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);

    useEffect(() => {
        // Initialize floating blockchain blocks
        const initialBlocks = Array.from({length: 20}, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.6 + 0.1
        }));
        setBlocks(initialBlocks);

        // Animate blocks
        const blockAnimation = setInterval(() => {
            setBlocks(prev => prev.map(block => ({
                ...block,
                x: (block.x + 0.2) % 100,
                y: (block.y + 0.1) % 100,
                opacity: 0.1 + (Math.sin(Date.now() * 0.001 + block.id) + 1) * 0.3
            })));
        }, 100);

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = 'https://kas.fyi/krc20-tokens';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            clearInterval(blockAnimation);
        };
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 35%, #0f3460 100%)',
            overflow: 'hidden',
            fontFamily: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
            {/* Animated Background Blocks */}
            {blocks.map(block => (
                <div
                    key={block.id}
                    style={{
                        position: 'absolute',
                        left: `${block.x}%`,
                        top: `${block.y}%`,
                        width: '8px',
                        height: '8px',
                        background: `rgba(112, 199, 186, ${block.opacity})`,
                        borderRadius: '2px',
                        boxShadow: `0 0 ${8 + block.opacity * 10}px rgba(112, 199, 186, ${block.opacity * 0.8})`
                    }}
                />
            ))}

            {/* Grid Pattern Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                    linear-gradient(rgba(112, 199, 186, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(2, 2, 2, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
            }} />

            {/* Main Content Container */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '2rem',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{
                    textAlign: 'center',
                    maxWidth: '900px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(112, 199, 186, 0.2)',
                    borderRadius: '24px',
                    padding: '3rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    animation: 'containerGlow 3s ease-in-out infinite alternate'
                }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '2rem' }}>
                        <img 
                            src={logo as string} 
                            alt="KatScan" 
                            style={{
                                width: '120px',
                                height: 'auto',
                                filter: 'drop-shadow(0 0 20px rgba(112, 199, 186, 0.6))',
                                animation: 'logoFloat 4s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Main Title */}
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #70c7ba 0%, #49eacb 50%, #70c7ba 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 30px rgba(112, 199, 186, 0.3)',
                        letterSpacing: '-0.02em'
                    }}>
                        System Evolution in Progress
                    </h1>

                    {/* Subtitle */}
                    <h2 style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.85)',
                        marginBottom: '3rem',
                        letterSpacing: '0.05em'
                    }}>
                        Upgrading to Next-Generation Infrastructure
                    </h2>

                    {/* Technical Status */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        <div style={{
                            background: 'rgba(112, 199, 186, 0.1)',
                            border: '1px solid rgba(112, 199, 186, 0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                color: '#70c7ba',
                                fontSize: '2rem',
                                marginBottom: '0.5rem'
                            }}>⚡</div>
                            <div style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>Performance Optimization</div>
                        </div>
                        
                        <div style={{
                            background: 'rgba(112, 199, 186, 0.1)',
                            border: '1px solid rgba(112, 199, 186, 0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                color: '#70c7ba',
                                fontSize: '2rem',
                                marginBottom: '0.5rem'
                            }}>🔐</div>
                            <div style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>Security Enhancement</div>
                        </div>
                        
                        <div style={{
                            background: 'rgba(112, 199, 186, 0.1)',
                            border: '1px solid rgba(112, 199, 186, 0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                color: '#70c7ba',
                                fontSize: '2rem',
                                marginBottom: '0.5rem'
                            }}>🚀</div>
                            <div style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>New Features</div>
                        </div>
                    </div>

                    {/* Message */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(112, 199, 186, 0.1) 0%, rgba(73, 234, 203, 0.1) 100%)',
                        border: '1px solid rgba(112, 199, 186, 0.3)',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '3rem',
                        backdropFilter: 'blur(15px)'
                    }}>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.6',
                            marginBottom: '1.5rem',
                            fontWeight: '400'
                        }}>
                            Our advanced KRC-20 explorer is undergoing critical infrastructure upgrades to deliver 
                            unparalleled performance and cutting-edge features.
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: '1.6',
                            marginBottom: 0
                        }}>
                            Continue your KRC-20 exploration at{' '}
                            <span style={{
                                color: '#70c7ba',
                                fontWeight: '700',
                                textDecoration: 'underline',
                                textShadow: '0 0 10px rgba(112, 199, 186, 0.5)'
                            }}>
                                Kas.fyi
                            </span>
                            {' '}during this brief enhancement period.
                        </p>
                    </div>

                    {/* Countdown Section */}
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '2px solid rgba(112, 199, 186, 0.4)',
                        borderRadius: '20px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        backdropFilter: 'blur(15px)'
                    }}>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: '1.5rem',
                            fontWeight: '500'
                        }}>
                            Automatic redirect to Kas.fyi in:
                        </p>
                        <div style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: '900',
                            color: '#70c7ba',
                            textShadow: '0 0 30px rgba(112, 199, 186, 0.7)',
                            marginBottom: '0.5rem',
                            animation: `countdownPulse 1s ease-in-out infinite, ${countdown <= 5 ? 'urgentGlow 0.5s ease-in-out infinite alternate' : 'none'}`,
                            fontFamily: '"JetBrains Mono", monospace'
                        }}>
                            {countdown.toString().padStart(2, '0')}
                        </div>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontWeight: '400',
                            letterSpacing: '0.1em'
                        }}>
                            SECONDS
                        </p>
                    </div>

                    {/* Action Button */}
                    <a 
                        href="https://kas.fyi/krc20-tokens"
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #70c7ba 0%, #49eacb 100%)',
                            color: '#0f3460',
                            padding: '1rem 3rem',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            letterSpacing: '0.05em',
                            boxShadow: '0 10px 30px rgba(112, 199, 186, 0.4)',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(112, 199, 186, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(112, 199, 186, 0.4)';
                        }}
                    >
                        CONTINUE TO KAS.FYI
                    </a>
                </div>
            </div>

            {/* Advanced CSS Animations */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700;900&display=swap');
                
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                
                @keyframes containerGlow {
                    0% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(112, 199, 186, 0.2); }
                    100% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(112, 199, 186, 0.4), 0 0 50px rgba(112, 199, 186, 0.1); }
                }
                
                @keyframes logoFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes countdownPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                
                @keyframes urgentGlow {
                    0% { text-shadow: 0 0 30px rgba(112, 199, 186, 0.7); }
                    100% { text-shadow: 0 0 50px rgba(255, 100, 100, 0.8), 0 0 30px rgba(112, 199, 186, 0.7); }
                }
                
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};