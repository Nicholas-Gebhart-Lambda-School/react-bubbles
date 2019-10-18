import React, { useState } from 'react';
import editColorList from '../services/editColor';
import deleteColorList from '../services/deleteColor';
import addColor from '../services/addColor';
const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState('');

  const handleChanges = e => {
    console.log(newColor);
    const { name, value } = e.target;
    setNewColor({ ...newColor, [name]: value });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    editColorList(colorToEdit, colorToEdit.id)
      .then(res => {
        updateColors(
          colors.map(color => (res.data.id === color.id ? res.data : color))
        );
        setEditing(false);
      })
      .catch(err => console.error('WHOOPS', err));
  };

  const deleteColor = color => {
    // No need for res data, can filter with anonymous function
    deleteColorList(colorToEdit.id).then(() => {
      updateColors(colors.filter(({ id }) => color.id !== id));
      setEditing(false);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form>
        <input
          type="text"
          name="color"
          placeholder="color"
          value={newColor.color}
          onChange={handleChanges}
        />
        <input
          type="text"
          name="hex"
          placeholder="hex"
          value={newColor.hex}
          onChange={handleChanges}
        />
        <button
          onClick={e => {
            console.log('red');
            e.preventDefault();
            addColor(newColor.color, newColor.hex).then(res =>
              updateColors(res.data)
            );
            setNewColor({ color: '', hex: '' });
          }}
        >
          Add Color
        </button>
      </form>
    </div>
  );
};

export default ColorList;

// {
// color: "aquamarine",
// code: {
// hex: "#7fffd4"
// },
// id: 4
// }
