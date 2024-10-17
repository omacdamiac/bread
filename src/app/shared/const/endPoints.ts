export class END_POINTS {
  // login
  public static readonly AUTH = '/auth';

  public static readonly MONITORING = '/procesosjob/';
  public static readonly MONITORING_DETALLE = '/procesosjobdetalle';
  public static readonly CONFIG_PROCESO = '/configproceso/';
  public static readonly TYPE_PROCESSES = '1';
  public static readonly TYPE_REPORTS = '2';
  public static readonly PARAMETROS_BAR = 'parametros/'; 
  public static readonly PARAMETROS = 'parametros'; 
  public static readonly DATA_CONSULTA = 'dataconsulta'; 

  public static readonly REPORTS = '/reportes';
  public static readonly REPORT = '/rpt_ope_cont';

  // funcionality.service
  public static readonly FUNCIONALITY = '/funcionalidad';
  public static readonly SUBFUNCIONALITY = '/subfuncionalidad';
  
  // security.service
  public static readonly SECURITY = '/security';
  public static readonly PROFILE = '/perfiles';
  public static readonly PERMISSIONS = '/permisos';
  public static readonly ROLES = '/roles';
  public static readonly RELATIONRP = '/asigroles';
  public static readonly RELATIONPF = '/asigperfiles';
  public static readonly USERS = '/usuarios';

  //assign.service
  public static readonly ASSIGN = '/asigaccesos';
  public static readonly ASSIGNPF = '/asigperfiles';

  //audit.service
  public static readonly AUDIT = '/auditoria';
  public static readonly CONSULT_USER = '/consultar_usuario';

  // METHODs
  public static readonly GET = '/consultar';
  public static readonly POST = '/insertar';
  public static readonly PUT = '/actualizar';
  public static readonly DELETE = '/actualizar';

  public static readonly CONSULT = '/consulta';

}

// environment.API + END_POINTS.REPORTS
