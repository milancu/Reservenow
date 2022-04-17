package cz.cvut.fel.rsp.ReservationSystem.rest.interfaces;

import cz.cvut.fel.rsp.ReservationSystem.model.Feedback;
import cz.cvut.fel.rsp.ReservationSystem.model.reservation.ReservationSystem;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.ReservationSystemDTO;
import cz.cvut.fel.rsp.ReservationSystem.rest.DTO.SourceDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SystemController {
    // GET /systems
    public List<ReservationSystemDTO> getReservationSystems();

    // GET /systems/{system_id}
    public ReservationSystemDTO getById(Integer systemId);

    // GET /systems/{system_id}/sources
    public List<SourceDTO> getSources(Integer systemId);

    // GET /systems/{system_id}/feedback
    public List<Feedback> getFeedback(Integer systemId);

    // POST /systems/{system_id}/feedback
    public ResponseEntity<Void> createFeedback(Integer systemId, Feedback feedback);

    // POST /systems/{system_id}/sources
    public ResponseEntity<Void> createSource(Integer systemId, SourceDTO sourceDTO);

    // GET /systems/{system_id}/reservations?time="today"
    public List<ReservationDTO> getAllReservationsToday(Integer systemId);

    // GET /systems/{system_id}/reservations?year=""&month=""&day=""
    public List<ReservationDTO> getAllReservationsForDay(Integer year, Integer month, Integer day);
}
