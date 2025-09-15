import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MiNodo implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mi Nodo',
    name: 'miNodo',
    group: ['transform'],
    version: 1,
    description: 'Nodo personalizado de ejemplo',
    defaults: {
      name: 'Mi Nodo',
      color: '#00FF00',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Texto',
        name: 'texto',
        type: 'string',
        default: '',
        description: 'Texto de entrada',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const texto = this.getNodeParameter('texto', 0) as string;
    return [[{ json: { resultado: `Hola ${texto}` } }]];
  }
}