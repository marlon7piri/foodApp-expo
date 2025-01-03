export const randomColor =()=>{

    const randomValue = () => Math.floor(Math.random() * 56) + 200; // Genera un valor entre 200 y 255
    const r = randomValue();
    const g = randomValue();
    const b = randomValue();
    return `rgb(${r}, ${g}, ${b})`;

    
  }