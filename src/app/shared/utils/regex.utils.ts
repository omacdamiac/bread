export class REGEX {
  //assign.service
  public static readonly EMAIL =
    '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}';
  public static readonly EMAIL2 =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public static readonly OTHER = '';
}
