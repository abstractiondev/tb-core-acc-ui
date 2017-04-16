 


import {Injectable} from "@angular/core";
import {TheBallService} from "./theball.service";

@Injectable()
export class CompanyNameDomainNameAppScopeNameService {

	constructor(private tbService:TheBallService) {
	}

	async ExampleOperation(param:ExampleInterfaceObject) : Promise<any> {
		let result = await this.tbService.ExecuteOperation("CompanyName.DomainName.AppScopeName.ExampleOperation", param);
		return result;
	}
}

export class ExampleInterfaceObject {
	public ExampleProperty: string;
	public constructor(init?:Partial<ExampleInterfaceObject>) {
		Object.assign(this, init);
	}
}

