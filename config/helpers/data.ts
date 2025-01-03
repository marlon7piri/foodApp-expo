import {ImageSourcePropType} from 'react-native';

type TiposCategorias = 'Carnes' | 'Lacteos' | 'Frutas' | 'Bebidas';

interface Categoria {
  nombre: string;
  icono: ImageSourcePropType;
}

export const categorias: Categoria[] = [
  {
    nombre: 'Carnes',
    icono: require('../../../assets/chicken.png'),
  },
  {
    nombre: 'Lacteos',
    icono: require('../../../assets/cheesse.png'),
  },
  {
    nombre: 'Frutas',
    icono: require('../../../assets/strawberry.png'),
  },
  {
    nombre: 'Vegetales',
    icono: require('../../../assets/carrot.png'),
  },
  {
    nombre: 'Bebidas',
    icono: require('../../../assets/beer.png'),
  },
];
export const recetas: Recetas[] = [
  {
    nombre: 'Pollo a la brasa',
    ingredientes: [{nombre: 'Pollo', categoria: 'Carnes', precio: 2.67}],
    preparacion: `Preparar la Marinada:

En un bol grande, mezcla los ajos picados, la pasta de ají panca (o ají amarillo), el sillao, el comino, la pimienta negra, el orégano, el vinagre rojo y sal al gusto. Esta mezcla formará la marinada para el pollo.
Marinar el Pollo:

Lava el pollo entero y sécalo bien con papel de cocina.
Con un cuchillo afilado, haz cortes profundos en la carne del pollo para que la marinada penetre.
Coloca el pollo en un recipiente grande o una bolsa para congelar con cierre hermético.
Vierte la marinada sobre el pollo, asegurándote de cubrirlo completamente, tanto por fuera como por dentro. Masajea suavemente para que la marinada se distribuya uniformemente.
Cubre el recipiente o cierra la bolsa con el pollo y refrigera por al menos 4 horas, o idealmente durante la noche, para que el pollo absorba los sabores.
Preparar la Parrilla o el Horno:

Si usas una parrilla, asegúrate de precalentarla a temperatura media-alta.
Si usas el horno, precaliéntalo a 200°C.
Cocinar el Pollo:

Retira el pollo marinado del refrigerador y deja que alcance la temperatura ambiente mientras se calienta la parrilla u horno.
Si usas parrilla: Coloca el pollo sobre la parrilla caliente y cocina, volteándolo ocasionalmente, durante aproximadamente 45 minutos a 1 hora, o hasta que esté cocido completamente y dorado por fuera. Usa un termómetro de cocina para asegurarte de que la temperatura interna del pollo alcance los 75°C.
Si usas horno: Coloca el pollo en una bandeja para hornear y cocina durante aproximadamente 1 hora, o hasta que esté dorado y cocido completamente, volteándolo una vez a la mitad de la cocción.
Servir:

Una vez cocido, retira el pollo del fuego y déjalo reposar durante unos 10 minutos antes de cortarlo.
Corta el pollo en presas y sirve caliente acompañado de papas fritas, ensalada criolla y salsa de ají.`,
  },
  {
    nombre: 'Camarones al Ajillo',
    ingredientes: [{nombre: 'Camarones', categoria: 'Carnes', precio: 3.67}],
    preparacion: `Preparar los Camarones:

Si los camarones están congelados, descongélalos siguiendo las instrucciones del paquete. Luego, asegúrate de pelarlos y desvenarlos si no están listos.
Seca los camarones con papel de cocina y reserva.
Preparar la Sartén:

Calienta el aceite de oliva en una sartén grande a fuego medio.
Cocinar los Ajos:

Agrega los ajos picados a la sartén caliente y cocina, revolviendo constantemente, durante 1-2 minutos o hasta que estén fragantes y ligeramente dorados. Asegúrate de no quemarlos.
Cocinar los Camarones:

Añade los camarones a la sartén y cocina durante 2-3 minutos por cada lado, o hasta que estén rosados y completamente cocidos.
Agregar los Ingredientes Adicionales:

Vierte el vino blanco y el jugo de limón sobre los camarones. Espolvorea el pimentón dulce y la pimienta roja triturada (si la estás utilizando). Cocina durante 1-2 minutos más, revolviendo ocasionalmente, hasta que la salsa se reduzca ligeramente.
Ajustar la Sazón:

Prueba la salsa y ajusta la sal y la pimienta según sea necesario.
Servir:

Transfiere los camarones al ajillo a un plato para servir. Espolvorea con perejil fresco picado para decorar.
Sirve caliente con rodajas de pan baguette o pan de ajo para mojar en la deliciosa salsa.
    `,
  },
];

export interface Productos {
  nombre: string;
  precio: number;
  categoria: TiposCategorias;
}
export interface Recetas {
  nombre: string;
  ingredientes: Productos[];
  preparacion: string;
}
