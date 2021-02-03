<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once __ROOT__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__ROOT__);
$dotenv->load();

class sendMessage
{

    public function send($from, $fromName, $subject, $body, $inCopy)
    {
        //PHPMailer Object
        $mail = new PHPMailer(true); //Argument true in constructor enables exceptions
        try {
            $mail->SMTPDebug  = 0; // enables SMTP debug information (for testing)
            $mail->IsSMTP();
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
            $mail->SMTPAuth   = true;
            $mail->Host       = $_ENV['SMTP_SERVER'];
            $mail->Port       = 587;
            $mail->SMTPSecure = "tls";
            $mail->Username   = $_ENV['SMTP_USER'];
            $mail->Password   = $_ENV['SMTP_PASSWORD'];

            //From email address and name
            $mail->setFrom($from, $fromName);

            //To address and name
            //$mail->addAddress("recepient1@example.com", "Recepient Name");
            $mail->addAddress($_ENV['CONTACT_ADDRESS']); //Recipient name is optional

            //Address to which recipient will reply
            $mail->addReplyTo($from, $fromName);

            //CC and BCC
            if ($inCopy) {
                $mail->addCC($from);
            }
            $mail->addBCC($_ENV['PERSONAL_ADDRESS']);

            $mail->WordWrap = 50;

            //Send HTML or Plain Text email
            $mail->isHTML(false);

            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AltBody = $body;
        
            $mail->send();
            return array('success' => true);

        } catch (Exception $e) {
            return array('success' => false, 'error' => $mail->ErrorInfo);
        }
    }

    public function checkRobots($token)
    {
        if (empty($token)) {
            $response['line'] = __FILE__ . ':' . __LINE__;
            return json_encode($response);
        }

        $post_query = http_build_query(
            array(
                'secret' => $_ENV['reCAPTCHA_SECRET_KEY'],
                'response' => $token
            )
        );

        // invio richiesta a google per verifica token
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt(
            $ch,
            CURLOPT_POSTFIELDS,
            $post_query
        );
        // Receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = json_decode(curl_exec($ch), true);

        curl_close($ch);

        return $response;
    }
}
?>