using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class CambiaNombreDeAlgunasColumnas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales");

            migrationBuilder.RenameColumn(
                name: "ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales",
                newName: "ServicioProfesionalId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendasServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales",
                newName: "IX_AgendasServiciosProfesionales_ServicioProfesionalId");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioProfesionalId",
                table: "AgendasServiciosProfesionales",
                column: "ServicioProfesionalId",
                principalTable: "ServiciosProfesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioProfesionalId",
                table: "AgendasServiciosProfesionales");

            migrationBuilder.RenameColumn(
                name: "ServicioProfesionalId",
                table: "AgendasServiciosProfesionales",
                newName: "ServicioDelProfesionalId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendasServiciosProfesionales_ServicioProfesionalId",
                table: "AgendasServiciosProfesionales",
                newName: "IX_AgendasServiciosProfesionales_ServicioDelProfesionalId");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendasServiciosProfesionales_ServiciosProfesionales_ServicioDelProfesionalId",
                table: "AgendasServiciosProfesionales",
                column: "ServicioDelProfesionalId",
                principalTable: "ServiciosProfesionales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
