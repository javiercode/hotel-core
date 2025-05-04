import { Request, Response, NextFunction } from 'express';
import { decode } from 'punycode';
import { JwtPayload, MessageResponse } from '../entities/dto/GeneralDto';
import { RolesEnum } from '../configs/Config.enum';
import jwt from 'jsonwebtoken';

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    const aToken = authHeader?.split(' ');
    if (req.originalUrl.toString().includes("/servicio2/") || req.originalUrl.toString().includes("habitacion/list") || req.originalUrl.toString().includes("/user/") || req.originalUrl.toString().includes("/login") || req.originalUrl.toString().includes("/usuario/create")) {
        next()
    } else {
        if (req.originalUrl.toString().includes("/user/getFoto") || req.originalUrl.toString().includes("/login") || aToken?.length == 2) {
            const token: string = authHeader?.split(' ')[1] || '';
            const decodeToken = getAuthUser(req)

            if (token && decodeToken.activo) {
                res = encodeToken(res, decodeToken.username, decodeToken.name, decodeToken.rol, decodeToken.rolId, decodeToken.aSucursal, decodeToken.sucursal, decodeToken.userId);
                next()
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }

}

export const encodeToken = (res: Response, usuario: string, nombre: string, rol: string[], rolId: number, aSucursal: number[], sucursal: number, userId: number) => {
    const userForToken: JwtPayload = {
        username: usuario,
        name: nombre,
        rol: rol,
        rolId: rolId,
        aSucursal: aSucursal,
        sucursal: sucursal,
        userId: userId,
        activo: true
    }

    const token = jwt.sign(
        userForToken,
        process.env.JWT_TOKEN_SECRET || '',
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRE || '0')
        }
    )
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Authorization', token)
    return res;
}

export const getToken = (res: Response, usuario: string, nombre: string, rol: string[], rolId: number, aSucursal: number[], sucursal: number, userId: number) => {
    const userForToken: JwtPayload = {
        username: usuario,
        name: nombre,
        rol: rol,
        rolId: rolId,
        aSucursal: aSucursal,
        sucursal: sucursal,
        userId: userId,
        activo: true
    }

    const token = jwt.sign(
        userForToken,
        process.env.JWT_TOKEN_SECRET || '',
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRE || '0')
        }
    )
    return token;
}

export const getAuthUser = (req: Request) => {
    let auth = {
        username: "",
        name: "",
        rol: [],
        rolId: 0,
        aSucursal: [],
        sucursal: 0,
        userId: 0,
        activo: false
    } as JwtPayload;
    try {

        const authHeader = req.get('Authorization');
        const token: string = authHeader?.split(' ')[1] || '';
        if(authHeader!=undefined){
            auth = jwt.verify(token, process.env.JWT_TOKEN_SECRET || '') as JwtPayload;
        }
    } catch (error) {
        console.error(error)
    }
    return auth;
}

export const esJugador = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const esAdmin = aRol.filter(rolAplicacion => rolAplicacion !== RolesEnum.JUGADOR)
    return esAdmin.length==0;
}

export const esAdmin = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const rolFind = aRol.find(element => (element === RolesEnum.ADMIN))
    return rolFind !== undefined;
}

export const esSeo = (auth: JwtPayload) => {
    const aRol = auth.rol || [];
    const rolFind = aRol.find(element => (element === RolesEnum.SEO))
    return rolFind !== undefined;
}

export async function controlJurisdiccion(sucursal: number, authSession: JwtPayload): Promise<MessageResponse> {
    const res: MessageResponse = { success: false, message: "El usuario no tiene la jurisdicción para proceder", code: 0 };
    try {
        if(!esAdmin(authSession)){
            const resultFilter = authSession.aSucursal.filter(oSucursal => oSucursal == sucursal);
            res.success = resultFilter.length > 0;
            res.message = res.success ? "El usuario tiene la jurisdicción para proceder" : "El usuario no tiene la jurisdicción para proceder"
        }else{
            res.success=true;
            res.message="El usuario tiene la jurisdicción para proceder";
        }
    } catch (error) {
        console.error(error)
    }
    return res;
}

// 1,ADM
// 4,GER
// 3,JEF
// 2,OFI

