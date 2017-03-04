 


import {Injectable} from "@angular/core";
import {TheBallService} from "./theball.service";

@Injectable()
export class CompanyNameDomainNameAppScopeNameService {

	constructor(private tbService:TheBallService) {
	}

	async ExampleOperation() : Promise<any> {
		let result = await this.tbService.ExecuteOperation("CompanyName.DomainName.AppScopeName.ExampleOperation");
		return result;
	}
}
