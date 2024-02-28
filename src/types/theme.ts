export interface ITheme {
  color: {
    [key: string]: string;
  };
  fontFamily: {
    [key: string]: string;
  };
  fontWeight: {
    [key: string]: number;
  };
  fontSize: {
    [key: string]: number;
  };
  borderRadius: {
    [key: string]: number;
  };
  container: {
    [key: string]: number;
  };
}
