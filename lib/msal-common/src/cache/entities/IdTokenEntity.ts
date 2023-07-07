/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { CredentialEntity } from "./CredentialEntity";
import { CredentialType } from "../../utils/Constants";

/**
 * ID_TOKEN Cache
 * 
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 */
export class IdTokenEntity extends CredentialEntity {
    /** Full tenant or organizational identifier that the account belongs to */
    realm: string;

    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createIdTokenEntity(
        homeAccountId: string,
        environment: string,
        idToken: string,
        clientId: string,
        tenantId: string
    ): IdTokenEntity {
        const idTokenEntity = new IdTokenEntity();

        idTokenEntity.credentialType = CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;

        return idTokenEntity;
    }

    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isIdTokenEntity(entity: object): boolean {
        if (!entity) {
            return false;
        }

        return (
            entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.ID_TOKEN
        );
    }
}
