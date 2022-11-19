import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [races, setRaces] = useState([]);
  const [race, setRace] = useState({})
  const [cclass, setCclass] = useState({})
  const [background, setBackground] = useState({})
  const [classes, setClasses] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");
  const [characters, setCharacters] = useState([]);
  
  const fetchCharacters = async() => {
    try {
      const response = await axios.get("/api/characters");
      
      setCharacters(response.data.characters);
      console.log(characters);
    } catch (error) {
      setError("error retrieving characters; " + error);
    }
  }
  
  
  const createCharacter = async() => {
    try {
      await axios.post("/api/characters", {name: name, race: race, cclass: cclass, background: background, level: level});
    } catch (error) {
      setError("error creating a character" + error);
    }
  }
  const addCharacter = async(e) => {
    e.preventDefault();
    await createCharacter();
    fetchCharacters();
    setName("");
    setRace("");
    setCclass("");
    setBackground("");
    setLevel("");
  }
  
  const deleteOneCharacter = async(character) => {
    try {
      await axios.delete("/api/characters/" + character.id);
    } catch (error) {
      setError("error deleting a character" + error);
    }
  }
  
  const deleteCharacter = async(character) => {
    await deleteOneCharacter(character);
    fetchCharacters();
  }
  
  const fetchRaces = async () => {
        await fetch(`https://api.open5e.com/races/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => setRaces(response.results));
    }
  
  
  
  const fetchClasses = async () => {
        await fetch(`https://api.open5e.com/classes/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => setClasses(response.results));
    }
  
  const fetchBackgrounds = async () => {
        await fetch(`https://api.open5e.com/backgrounds/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => setBackgrounds(response.results));
    }
  useEffect(() => {
    fetchRaces();
  },[]);
  useEffect(() => {
    fetchCharacters();
  },[]);
  useEffect(() => {
    fetchBackgrounds();
  },[]);
  useEffect(() => {
    fetchClasses();
  },[]);
  return (
    <div className="App">
    {error}
    
    
      <h1> Character Creation Application</h1>
      <form onSubmit={addCharacter}>
      
        <fieldset>
          <legend>Name your character and choose a race, class and background.</legend>
          <label>
          
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <label>
            Race:
          </label>
          <select id="selector" onChange={e => setRace(e.target.value)}>
            <option>select race</option>
            {races.map( race =>(
              <option key={race.name} value = {race.name} >{race.name}</option>
            ))}
          </select>
          <label>
            Class:
          </label>
          <select id="selector" onChange={e => setCclass(e.target.value)}>
              <option>select class</option>
            {classes.map( cclass =>(
              <option key={cclass.name} value = {cclass.name} >{cclass.name}</option>
            ))}
          </select>
          <label>
            Background:
          </label>
          <select id="selector" onChange={e => setBackground(e.target.value)}>
            <option>select background</option>
            {backgrounds.map( background =>(
              <option key={background.name} value = {background.name} >{background.name}</option>
            ))}
          </select>
          <label>
            Level:
            <input type="text" value={level} onChange={e => setLevel(e.target.value)}/>
          </label>
        </fieldset>
      
      <input type="submit" value="Submit" />
    </form>
    <h1>Characters</h1>
      {console.log(characters)}
      {characters.map( character => (
      
        <div key={character.id} className="character">{console.log(JSON.stringify(character.race))}
          Name: {character.name}
          <div className="information">
            <p>{character.race} {character.cclass}</p>
            <p>A(n) {character.background}</p>
            <p>Currently level: {character.level} </p>
            
          </div>
          <button onClick={e => deleteCharacter(character)}>Delete</button>
        </div>
      ))}   
      <p>Github repository located at <a href="https://github.com/Jacob-Wahlquist/creativeproject4.git">This Spot</a></p>
    </div>
  );
}

export default App;
