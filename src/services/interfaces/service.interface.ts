import { Widget } from 'src/widgets/entities/widget.entity';

export interface Service {
  id?: string;
  name: string;
  widgets: [Widget];
}
