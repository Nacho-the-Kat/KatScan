import React, {FC, useMemo, useState, useCallback} from "react";
import {useFetch} from "../hooks/useFetch";
import {Input, List, Page} from "nacho-component-library";
import { WhitelistUpdateModal } from "../components/whitelist/WhitelistUpdateModal";
import { Button } from 'react-bootstrap';
import '../styles/WhitelistPage.css'

type WhitelistData = {
    id: string
    address: string
}

const WhitelistPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [fetchVersion, setFetchVersion] = useState(0)
    
    const handleUpdateSuccess = useCallback(() => {
        setFetchVersion(v => v + 1);
    }, []);

    return (
        <Page 
            header="Whitelist Management"
            additionalHeaderComponent={
                <Input 
                    customClass={'whitelist-search-form'}
                    placeholder={'Search by wallet address...'}
                    onChangeCallback={setSearchTerm}
                    onSubmit={setSearchTerm}
                />
            }
        >
            <div className={'whitelists-page'}>
                <Whitelist 
                    searchTerm={searchTerm}
                    fetchVersion={fetchVersion}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            </div>
        </Page>
    );
}

const donHeaders = ['Wallet Address', 'Actions']

type ListProps = {
    searchTerm: string
    fetchVersion: number
    onUpdateSuccess: () => void
}

const Whitelist: FC<ListProps> = ({searchTerm, fetchVersion, onUpdateSuccess}) => {
    const [selectedWhitelist, setSelectedWhitelist] = useState<WhitelistData | null>(null);
    
    const {data, loading} = useFetch<WhitelistData[]>({
        url: '/whitelist',
        avoidLoading: false,
        sort: ['id', 'asc'],
        params: { version: fetchVersion }
    });

    const internalData = useMemo(() => {
        if (!data) return [];
        if (searchTerm === '') {
            return data;
        }
        return data.filter(single => single.address.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [data, searchTerm]);

    const renderItem = (item: WhitelistData): Record<string, unknown> & { id: string } => ({
        ...item,
        'Wallet Address': (
            <div className="list-cell address">
                {item.address}
            </div>
        ),
        'Actions': (
            <div className="list-cell">
                <Button 
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setSelectedWhitelist(item)}
                >
                    Edit
                </Button>
            </div>
        )
    });

    if (loading) {
        return <div className="loading-state">Loading whitelist data...</div>;
    }

    if (!loading && (!data || data.length === 0)) {
        return <div className="empty-state">No whitelist entries found</div>;
    }

    return (
        <>
            <div className="list-container">
                <List 
                    headerElements={donHeaders}
                    items={internalData.map(renderItem)}
                    itemHeight={50}
                    isLoading={loading}
                />
            </div>
            
            {selectedWhitelist && (
                <WhitelistUpdateModal
                    show={true}
                    onClose={() => setSelectedWhitelist(null)}
                    whitelistData={selectedWhitelist}
                    onSuccess={() => {
                        onUpdateSuccess();
                        setSelectedWhitelist(null);
                    }}
                />
            )}
        </>
    );
};

export default WhitelistPage;