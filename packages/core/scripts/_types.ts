export interface IconDefinition {
  id: string;
  name: string;
  contents: IconDefinitionContent[];
  projectUrl: string;
  license: string;
  licenseUrl: string;
  source?: IconSetSource;
}

export interface IconDefinitionContent {
  files: string | (() => Promise<string[]>);
  formatter(camelName: string, filePath: string): string;
  multiColor?: boolean;
  processWithSVGO?: boolean;
}

export type IconSetSource = IconSetGitSource;
export interface IconSetGitSource {
  type: "git";
  localName: string;
  remoteDir: string;
  url: string;
  branch: string;
  hash: string;
}

export interface TaskContext {
  rootDir: string;
  DIST: string;
  ICONS: string;
  LIB: string;
}

export interface IconsetVersion {
  icon: IconDefinition;
  version: string;
  count: number;
}

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child: IconTree[];
}
