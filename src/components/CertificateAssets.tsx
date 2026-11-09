import React from 'react';
import {
  CERT_LOGO_EMS_PNG,
  CERT_LOGO_CMDA_PNG,
  CERT_SIG_BARBARA_PNG,
  CERT_SIG_JAMES_PNG,
} from '../assets/certOriginalAssets';

/**
 * Logotipo 1 Oficial (Idêntico ao Certificado Nº 02):
 * Editora Mente e Saúde
 */
export const LogoEditoraMenteSaude: React.FC<{ size?: number; showBadgeBg?: boolean }> = ({
  size = 68,
}) => (
  <img
    src={CERT_LOGO_EMS_PNG}
    alt="Brasão Editora Mente e Saúde"
    width={size}
    height={size}
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', flexShrink: 0 }}
  />
);

/**
 * Logotipo 2 Oficial (Idêntico ao Certificado Nº 02):
 * Centro Profissionalizante Maria Dalva de Araújo
 */
export const LogoCentroMariaDalva: React.FC<{ size?: number }> = ({ size = 68 }) => (
  <img
    src={CERT_LOGO_CMDA_PNG}
    alt="Brasão Centro Profissionalizante Maria Dalva de Araújo"
    width={size}
    height={size}
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', flexShrink: 0 }}
  />
);

/**
 * Assinatura 1 Oficial (Idêntica ao Certificado Nº 02):
 * Bárbara Lima dos Santos
 */
export const SignatureBarbara: React.FC<{ width?: number; height?: number }> = ({
  width = 195,
  height = 54,
}) => (
  <img
    src={CERT_SIG_BARBARA_PNG}
    alt="Assinatura Bárbara Lima dos Santos"
    width={width}
    height={height}
    style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain', flexShrink: 0 }}
  />
);

/**
 * Assinatura 2 Oficial (Idêntica ao Certificado Nº 02):
 * James Araújo de Santana
 */
export const SignatureJames: React.FC<{ width?: number; height?: number }> = ({
  width = 195,
  height = 54,
}) => (
  <img
    src={CERT_SIG_JAMES_PNG}
    alt="Assinatura James Araújo de Santana"
    width={width}
    height={height}
    style={{ width: `${width}px`, height: `${height}px`, objectFit: 'contain', flexShrink: 0 }}
  />
);

/**
 * Selo Oficial Dourado de Fé Pública (Idêntico ao Certificado Nº 02)
 */
export const GoldPublicFaithSeal: React.FC<{ code: string; size?: number }> = ({
  code,
  size = 86,
}) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      backgroundColor: '#FFF2C7',
      border: '2.2px solid #D97706',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexShrink: 0,
      boxSizing: 'border-box',
      padding: '4px',
      color: '#78350F',
    }}
  >
    <div
      style={{
        fontFamily: "'Times New Roman', Georgia, serif",
        fontSize: '9px',
        fontWeight: 700,
        lineHeight: 1.15,
      }}
    >
      SELO OFICIAL
    </div>
    <div
      style={{
        fontFamily: "'Times New Roman', Georgia, serif",
        fontSize: '11px',
        fontWeight: 700,
        lineHeight: 1.2,
        marginTop: '2px',
      }}
    >
      FÉ PÚBLICA
    </div>
    <div
      style={{
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        fontSize: '7.5px',
        fontWeight: 700,
        lineHeight: 1.2,
        marginTop: '3px',
      }}
    >
      {code}
    </div>
  </div>
);
