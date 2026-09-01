"use client";

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AddDocumentBtnProps {
    userId: string,
    email: string,
}

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
    const router = useRouter();

    const addDocumentHandler = async () => {
        // ADD BUTTON LOGIC
        try {

            const room = await createDocument({ userId, email });

            if (room) router.push(`/documents/${room.id}`);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button type='submit' onClick={addDocumentHandler} className='gradient-blue flex dap-1 shadow-md'>
            <Plus size={24} />
            <p className='hidden sm:block'>
                Create a blank documents
            </p>
        </Button>
    )
}

export default AddDocumentBtn