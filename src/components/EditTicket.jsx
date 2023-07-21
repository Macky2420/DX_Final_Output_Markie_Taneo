import React, { useContext, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';
import Ticket from '../assets/ticket.png';
import { movieContext } from '../manager/Context';
import AddTicketForm from './AddTicketForm';
import { useQuery, gql } from '@apollo/client';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import Loading from '../components/Loading';

const GET_USER_TICKETS = gql`
  query getUserTickets($ticket_id: Int!) {
    tickets(where: { id: { _eq: $ticket_id } }) {
      name
      address
      date
      time
      tickets_movie {
        title
      }
    }
  }
`;

/* const UPDATE_TICKET = gql`
  mutation updateTicket($ticketId: Int!, $name: String!, $address: String!, $date: date!, $time: time!, $movie_id: Int!, $user_id: uuid!) {
    update_tickets_by_pk(pk_columns: { id: $ticketId }, _set: { name: $name, address: $address, date: $date, time: $time }, ticket_movie: { data: { title: $movieTitle } }) {
      id
      name
      address
      date
      time
      tickets_movie {
        id
      }
    }
  }
`;  */

const EditTicket = ({ticketId}) => {

  const { editModalVisible, setEditModalVisible } = useContext(movieContext);
  const formRef = useRef(null);
  const [form] = useForm();

  const { loading, error, data } = useQuery(GET_USER_TICKETS, {
    variables: { ticket_id: ticketId },
  });

  useEffect(() => {
    if (data && data.tickets && data.tickets.length > 0) {
      // Extract the ticket details from the data
      const { name, address, date, time, ticket_movie } = data.tickets[0];

      const formattedDate = dayjs(date);
      const formattedTime = dayjs(time, 'HH:mm');

      // Check if 'ticket_movie' exists and is an array with elements
      const title = Array.isArray(ticket_movie) && ticket_movie.length > 0 ? ticket_movie[0].title : '';

      form.setFields([
        { name: 'name', value: name },
        { name: 'address', value: address },
        { name: 'date', value: formattedDate },
        { name: 'time', value: formattedTime },
        { name: 'movie', value: title },
        // Set other form fields based on your form structure
      ]);
    }
  }, [data, form]);
  

  if(loading){
    return(<div>Loading...</div>);
  }
  if (error) {
    return (<div>Error: {error.message}</div>);
  }
  // For handle cancel modal
  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  

  /* const onFinish = async (values) => {
    const { name, address, date, time, movie } = values;
    const [updateTicket] = useMutation(UPDATE_TICKET);
    try {
      // Perform the mutation to update the ticket
      await updateTicket({
        variables: {
          ticketId: ticketId,
          name: name,
          address: address,
          date: date,
          time: time,
          movieTitle: movie,
        },
      });

      setEditModalVisible(false); // Close the modal after submission
    } catch (error) {
      console.error('Error updating ticket:', error.message);
      // Handle any error that may occur during the mutation
    }
  }; */

  return (
    <>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed -translate-x-2/4 -translate-y-2/4 z-[9999] left-2/4 top-2/4">
          <Loading />
        </div>
      )}
       {/* Display the Create ticket modal */}
        <Modal
          className='rounded-lg overflow-hidden shadow-lg'
            open={editModalVisible}
            onCancel={handleCancelEdit}
            footer={[
              <Button className='px-6 border-indigo-950' key='cancel' onClick={handleCancelEdit}>Cancel</Button>,
              <Button className='px-6 bg-indigo-950' key='submit' type='primary'  onClick={() => formRef.current.submit()}>Submit</Button>
            ]}
          >
            <div className='flex justify-center'>
              <img className='mr-4 h-12 w-12' src={Ticket} />
              <h1 className='mt-3 font-bold text-blue-950 text-lg'>Edit Appointment</h1>
            </div>
            <AddTicketForm form={form} formRef={formRef}/>
            
          </Modal>
    </>
  );
};

export default EditTicket;
