const REG_EXP_EMAIL =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

export const validateEmail = (emailEntry:string) => REG_EXP_EMAIL.test(emailEntry);
	