"use client";

import { useState } from 'react';
import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import { Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AddDocumentBtnProps } from '@/types/types';


const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const addDocumentHandler = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const room = await createDocument({ userId, email });
            if (room) router.push(`/documents/${room.id}`);
        } catch (error) {
            console.log(error);
        } 

        setLoading(false);
    };
    return (
        <Button type='submit' onClick={addDocumentHandler} disabled={loading} className='gradient-blue flex dap-1 shadow-md'>\
        {loading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
            <p className='hidden sm:block'>
                {loading ? "Create document..." : "Create blank document"}
            </p>
        </Button>
    )
}

export default AddDocumentBtn