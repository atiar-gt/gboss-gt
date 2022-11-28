export interface Permission {
    id: number;
    isAdd: boolean;
    isEdit: boolean;
    isApprove: boolean;
    isDelete: boolean;
    menuId: number;
    menuName: string;
    roleId: number;
    roleName: string;
}
