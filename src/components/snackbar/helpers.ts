export class HelperService {
    public static getNumberFromUrl = (url: any) => {
        const matches = url.match(/(\d+)\/?$/);
        if (matches) {
          return parseInt(matches[1], 10);
        }
        return null; 
      }
}