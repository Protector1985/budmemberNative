import React from 'react';
import { ColorPicker, fromHsv  } from 'react-native-color-picker'
import Matercolor from 'matercolors'
import { useDispatch } from 'react-redux';
import { setColorPalette } from '../../../store/userSlice';


export default function Picker({setBackgroundColor}) {
    const dispatch = useDispatch()
    const [color, setColor] = React.useState("#10356c")
    let palette = new Matercolor(color).palette['analogous']['primary']

    

    React.useEffect(() => {
        const mainColor = {
            main: color
        }
        Object.assign(palette, mainColor)
        dispatch(setColorPalette(palette))
    }, [color])

    return (
        <ColorPicker
            onColorChange={(color) => setColor(fromHsv(color))}
            onColorSelected={color => alert(`Color selected: ${color}`)}
            style={{flex: 1}}
            />
    )
} 