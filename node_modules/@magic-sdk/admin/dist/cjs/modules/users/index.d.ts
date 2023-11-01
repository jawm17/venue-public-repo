import { BaseModule } from '../base-module';
import { MagicUserMetadata, WalletType } from '../../types';
export declare class UsersModule extends BaseModule {
    logoutByIssuer(issuer: string): Promise<void>;
    logoutByPublicAddress(publicAddress: string): Promise<void>;
    logoutByToken(DIDToken: string): Promise<void>;
    getMetadataByIssuer(issuer: string): Promise<MagicUserMetadata>;
    getMetadataByToken(DIDToken: string): Promise<MagicUserMetadata>;
    getMetadataByPublicAddress(publicAddress: string): Promise<MagicUserMetadata>;
    getMetadataByTokenAndWallet(DIDToken: string, walletType: WalletType): Promise<MagicUserMetadata>;
    getMetadataByPublicAddressAndWallet(publicAddress: string, walletType: WalletType): Promise<MagicUserMetadata>;
    getMetadataByIssuerAndWallet(issuer: string, walletType: WalletType): Promise<MagicUserMetadata>;
}
