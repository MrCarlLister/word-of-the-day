export default function keyboard() {

    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'P'];
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const keyboardLayout = [row1, row2, row3];

       // Initialize the keyboard layout with key objects, each with a default status state
       const keyboard = keyboardLayout.map(row => row.map(key => ({
        key: key,
        status: 'active-almost' // Set the default status for each key
    })));


    console.log(keyboard);

    return keyboard;

}