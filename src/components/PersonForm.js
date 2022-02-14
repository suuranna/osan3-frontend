const PersonForm = (props) => {
    return (
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/> <br/>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} /> <br/>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm