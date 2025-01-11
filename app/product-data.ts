export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
  } //Like the class or model that we will be importing
  
  export const products: Product[] = [{
    id: '123',
    name: 'Munich Shibuya',
    imageUrl: 'Mshibuya.jpg',
    description: 'La zapatilla más completa, las SHIBUYA representan todo aquello que se necesita para sobrevivir al ajetreo del día a día. Con una suela chunky que se adapta en cada pisada, ensalza la nueva faceta deportiva que no deja de lado la funcionalidad ni el estilo.',
    price: 120,
  }, {
    id: '234',
    name: 'Munich Xemine',
    imageUrl: 'MXemine.jpg',
    description: 'La pura elegancia deportiva. La Xemine Road es el reestyling de un clásico del running que refleja el equilibrio entre la herencia y la auténtica esencia de la marca con renovados e imperecederos toques de estilo.',
    price: 110,
  }, {
      id: '345',
    name: 'Cetti C-1347',
    imageUrl: 'Cetti.jpg',
    description: 'La marca de calzados Cetti nació en Elche. Crea zapatos versátiles, cómodos y elegantes cuidando al detalle su fabricación con materiales de calidad. Creatividad, dinamismo, tendencia y estilo propio es lo que les define.',
    price: 135,
  }, {
    id: '456',
    name: 'Refresh 17218102',
    imageUrl: 'Refresh.jpg',
    description: 'Zapatilla de hombre, de la marca Refresh. Fabricada en un material que imita la piel. Cierre mediante cordones ajustables. Cómoda planta acolchada. Suela gruesa de goma antideslizante. Un modelo en tendencia esta temporada. Combina y eleva tus looks más casual. Con plantilla extraíble. Este modelo ha obtenido el certificado vegano por la organización mundial PETA (Organización de los derechos de los animales).',
    price: 49.95,
  }];