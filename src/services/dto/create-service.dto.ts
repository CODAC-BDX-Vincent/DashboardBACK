import { Widget } from 'src/widgets/entities/widget.entity';

export class CreateServiceDto {
  readonly name: string;
  readonly widgets: [Widget];
}
