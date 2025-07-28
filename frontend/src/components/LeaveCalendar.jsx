import { useEffect, useState, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/LeaveCalendar.css';
import api from '../api';
import { AuthContext } from '../context/AuthContext';


const localizer = momentLocalizer(moment);

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get('/leaves/calendar', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const formatted = res.data.map((leave) => ({
          title: `${leave.name} - ${capitalize(leave.leave_type)} Leave`,
          start: new Date(leave.start_date),
          end: new Date(leave.end_date),
          type: leave.leave_type,
        }));
        setEvents(formatted);
      } catch (err) {
        console.error('Error fetching leave events:', err);
      }
    };

    fetchLeaves();
  }, []);

  const eventStyleGetter = (event) => {
    let className = 'event-default';
    if (event.type === 'sick') className = 'event-sick';
    else if (event.type === 'vacation') className = 'event-vacation';
    else if (event.type === 'casual') className = 'event-casual';
    else if (event.type === 'maternity') className = 'event-maternity';

    return { className };
  };

  return (
    <div className="leave-calendar-wrapper">
      
      <div className="calendar-box">
        <div className="calendar-header">
        <h3>Employee Leave Calendar</h3>
      </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          views={['month']}
          popup
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default LeaveCalendar;
