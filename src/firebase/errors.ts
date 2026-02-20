export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete';
    requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
    constructor(public context: SecurityRuleContext) {
        super(`FirestorePermissionError: Insufficient permissions for operation.`);
        this.name = 'FirestorePermissionError';
        // You can log the context here for server-side debugging if needed
    }
}
