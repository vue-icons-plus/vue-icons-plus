export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child: IconTree[];
}
