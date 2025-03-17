package JavaLearning.hiber.Payload;


import java.time.LocalDateTime;

public class TransactionsViewDTO {
    private int amount;
    private Long senderAccountNumber;
    private Long receiverAccountNumber;
    private LocalDateTime timestamp;

    // Constructor
    public TransactionsViewDTO( int amount, Long senderAccountNumber, Long receiverAccountNumber, LocalDateTime timestamp) {
        this.amount = amount;
        this.senderAccountNumber = senderAccountNumber;
        this.receiverAccountNumber = receiverAccountNumber;
        this.timestamp = timestamp;
    }

   

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Long getSenderAccountNumber() {
        return senderAccountNumber;
    }

    public void setSenderAccountNumber(Long senderAccountNumber) {
        this.senderAccountNumber = senderAccountNumber;
    }

    public Long getReceiverAccountNumber() {
        return receiverAccountNumber;
    }

    public void setReceiverAccountNumber(Long receiverAccountNumber) {
        this.receiverAccountNumber = receiverAccountNumber;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}