import React from 'react';
import { Popconfirm, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client';

const DELETE_TICKET = gql`
  mutation deleteTicket($ticket_id: Int!) {
    delete_tickets(where: { id: { _eq: $ticket_id } }) {
      affected_rows
    }
  }
`;

const Delete = ({ dataSource }) => {
  const [deleteTicketMutation] = useMutation(DELETE_TICKET);

  // Function to handle the deletion of a ticket
  const handleDelete = async (ticketId) => {
    try {
      // Call the GraphQL mutation to delete the ticket
      await deleteTicketMutation({
        variables: { ticket_id: ticketId },
      });
    
      // Perform any additional cleanup or UI update after successful deletion, if needed
      console.log(`Ticket with ID ${ticketId} deleted successfully!`);
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <>
      {/* Delete Pop confirm */}
      <Popconfirm
        title="Delete the ticket"
        description="Are you sure to delete this ticket?"
        onConfirm={() => handleDelete(dataSource.key)} 
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: { backgroundColor: '#172554' },
        }}
        cancelButtonProps={{
          style: { borderColor: '#172554' },
        }}
      >
        <Button type="text" className="border-none">
          <DeleteOutlined style={{ fontSize: '17px', color: '#172554' }} />
        </Button>
      </Popconfirm>
    </>
  );
};

export default Delete;
