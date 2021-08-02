import * as fs from 'fs';

enum LogTypeEnum {
  warning = 'Warning',
  error = 'Error',
  info = 'Info',
}

export class Logging {
  private static readonly fileName: string = 'logs.txt';

  static deleteLogFile(): void {
    fs.unlink(this.fileName, () => {});
  }

  static addLog(message: string, callback: fs.NoParamCallback): void {
    fs.appendFile(this.fileName, message, callback);
  }
}

class LogFunction {
  addLog(args: any[], functionResult: any, logType: LogTypeEnum = LogTypeEnum.info): void {
    const logMessage = this.createLogMessage(args, functionResult, logType);
    Logging.addLog(logMessage, () => {});
  }

  private createLogMessage(args: any[], functionResult: any, logType: LogTypeEnum = LogTypeEnum.info): string {
    const title = `${logType} : ${new Date()}`;
    const argsInfo = `args: ${JSON.stringify(args)}`;
    const resultInfo = `result:${JSON.stringify(functionResult)}`;

    return `${title}\n${argsInfo}\n${resultInfo}\n\n`;
  }
}

const logFunction = new LogFunction();
export const Log = (logType: LogTypeEnum = LogTypeEnum.info) => {

  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        const result = targetMethod.apply(this, args);

        result
          .then((res) => logFunction.addLog(args, res, logType))
          .catch((err) => logFunction.addLog(args, err, LogTypeEnum.error)); 

        return result;
      } catch (error) {
        logFunction.addLog(args, error, LogTypeEnum.error);
        throw error;
      }
    };
  };
};
