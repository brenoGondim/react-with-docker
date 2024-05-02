import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }
}

function PhoneBookForm({ getData }) {
  const [formData, setFormData] = useState({
    userFirstname: 'Jon',
    userLastname: 'Jones',
    userPhone: '8885559999'
  });
  const [listPerson, setListPerson] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ordered = [...listPerson, formData].sort((a,b) => a.userLastname.localeCompare(b.userLastname));
    getData(ordered);
    setListPerson(ordered)
  };


  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        value={formData.userFirstname}
        onChange={handleChange}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        value={formData.userLastname}
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        value={formData.userPhone}
        onChange={handleChange}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable({data}) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      { data?.map((item, index) => (
        <tbody key={index}> 
          <tr>
            <th style={style.tableCell}>{item.userFirstname}</th>
            <th style={style.tableCell}>{item.userLastname}</th>
            <th style={style.tableCell}>{item.userPhone}</th>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default function Application(props) {
  const [listPerson, setListPerson] = useState([]);

  return (
    <div className="App">
      <PhoneBookForm getData={setListPerson}/>
      <InformationTable data={listPerson}/>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);